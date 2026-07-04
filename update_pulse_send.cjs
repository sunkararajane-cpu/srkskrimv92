const fs = require('fs');
const content = fs.readFileSync('src/components/PulseSheets.tsx', 'utf-8');

const startIndex = content.indexOf('export function PulseSendSheet({');
if (startIndex === -1) {
  console.log("Could not find PulseSendSheet");
  process.exit(1);
}

// Find the matching closing bracket for PulseSendSheet.
// It ends right before the end of the file or before another export if there was one.
// Actually, it's just the last component in the file right now.
// Let's just replace from export function PulseSendSheet({ to the end of the file, because we also have PulseShareSheet there that we don't need anymore.

const newComponent = `
export function PulseSendSheet({
  isOpen, onClose, post, onShareComplete
}: {
  isOpen: boolean; onClose: () => void; post: any;
  onShareComplete: (type: string, message: string) => void;
}) {
  const [activeView, setActiveView] = useState<'share' | 'connect'>('share');
  
  // Connect picker state
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);

  const shareUrl = typeof window !== 'undefined'
    ? \`skrim.chat/pulse/\${post?.id || 'post'}\`
    : \`skrim.chat/pulse/post\`;

  const allContacts = mockUsers.slice(0, 12).map(u => ({
    id: u.id,
    username: u.username?.replace('@', '') || u.id,
    displayName: u.displayName || u.username || '',
    avatar: u.avatar,
    isVerified: u.isVerified,
  }));

  const filteredContacts = searchQuery.trim()
    ? allContacts.filter(u =>
        u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.displayName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allContacts;

  useEffect(() => {
    if (isOpen) { 
      setActiveView('share');
      setSelectedContacts([]); 
      setSearchQuery(''); 
      setCopiedLink(false); 
      setShowAllPlatforms(false); 
    }
  }, [isOpen]);

  const close = (msg?: string) => {
    if (msg) onShareComplete('send', msg);
    setTimeout(onClose, 200);
    setTimeout(() => { 
      setActiveView('share');
      setSelectedContacts([]); 
      setSearchQuery(''); 
    }, 500);
  };

  const toggleContact = (id: string) =>
    setSelectedContacts(prev =>
      prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
    );

  const handleCopyLink = () => {
    navigator.clipboard.writeText(\`https://\${shareUrl}\`).catch(() => {});
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
    close('🔗 Link copied!');
  };

  const handleShareOption = (option: string) => {
    if (option === 'Connect') {
      setActiveView('connect');
    } else if (option === 'your story') {
      close('✨ Added to your Pulse!');
    } else if (option === 'Arattai') {
      handleCopyLink();
      close('💬 Shared to Arattai!');
    } else if (option === 'Copy') {
      handleCopyLink();
    } else {
      // Social options
      const platform = SOCIAL_PLATFORMS.find(p => p.label === option);
      if (platform && platform.action) {
        platform.action(\`https://\${shareUrl}\`);
        close(\`Shared to \${platform.label}!\`);
      }
    }
  };

  const handleSendInApp = () => {
    if (!post || selectedContacts.length === 0) return;
    try {
      const customChats: Record<string, any[]> = JSON.parse(localStorage.getItem('skrimchat_custom_chats') || '{}');
      const thumbnail = post.image || post.images?.[0] || null;
      
      const sentToNames: string[] = [];
      
      selectedContacts.forEach(userId => {
        const contact = allContacts.find(u => u.id === userId);
        const username = contact?.username || userId;
        sentToNames.push(username);
        
        const message = {
          id: \`postshare_\${post.id}_\${Date.now()}_\${username}\`,
          sender: 'me',
          type: 'post_share',
          postId: post.id,
          postThumbnail: thumbnail,
          postCaption: post.caption || post.text || '',
          postUser: { user: post.user, handle: post.handle, avatar: post.avatar },
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'sent',
          timestamp: Date.now(),
        };

        if (!customChats[username]) customChats[username] = [];
        customChats[username].push(message);
      });

      localStorage.setItem('skrimchat_custom_chats', JSON.stringify(customChats));
      window.dispatchEvent(new CustomEvent('skrimchat_post_shared', { detail: { usernames: sentToNames } }));
      window.dispatchEvent(new CustomEvent('skrimchat_custom_chats_updated'));

      const label = selectedContacts.length === 1 ? \`@\${sentToNames[0]}\` : \`\${selectedContacts.length} people\`;
      close(\`💬 Pulse sent to \${label}!\`);
    } catch (e) {
      close('💬 Sent!');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-end"
        >
          <motion.div
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={e => e.stopPropagation()}
            className="bg-[rgba(20,20,20,0.95)] border-t border-white/10 rounded-t-3xl flex flex-col w-full max-w-2xl mx-auto shadow-2xl pb-8"
            style={{ maxHeight: '90vh' }}
          >
            {activeView === 'share' ? (
              <div className="px-5 flex flex-col pt-4">
                <div className="flex justify-between items-center mb-5 sticky top-0 bg-transparent py-2 z-10 border-b border-white/5 pb-4">
                  <h3 className="font-bold text-white text-lg flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-[#B026FF]" /> Share Pulse ⚡
                  </h3>
                  <button onClick={onClose} className="p-1.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Primary actions */}
                <div className="flex flex-col gap-2 mb-5">
                  {/* Share to your Pulse */}
                  <button
                    onClick={() => handleShareOption("your story")}
                    className="w-full flex items-center gap-4 p-3.5 rounded-xl bg-[#B026FF]/10 border border-[#B026FF]/30 hover:bg-[#B026FF]/20 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-full bg-[#B026FF]/30 flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5 text-[#B026FF]" />
                    </div>
                    <div className="text-left">
                      <div className="text-white font-bold">Add to your Pulse</div>
                      <div className="text-[#B026FF]/70 text-xs mt-0.5">Reposts this to your pulse — live for 24h</div>
                    </div>
                  </button>

                  {/* Send in Connect — to a specific user */}
                  <button
                    onClick={() => handleShareOption("Connect")}
                    className="w-full flex items-center gap-4 p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-full bg-blue-500/30 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-left">
                      <div className="text-white font-bold">Send in Connect</div>
                      <div className="text-blue-400/70 text-xs mt-0.5">Pick a contact — opens their chat directly</div>
                    </div>
                  </button>

                  {/* Share in Arattai + copy link */}
                  <button
                    onClick={() => handleShareOption("Arattai")}
                    className="w-full flex items-center gap-4 p-3.5 rounded-xl bg-green-500/10 border border-green-500/30 hover:bg-green-500/20 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shrink-0 text-xl">
                      💬
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-white font-bold">Share in Arattai</div>
                      <div className="text-green-400/70 text-xs mt-0.5">Posts to Arattai feed + copies link</div>
                    </div>
                  </button>
                  
                  {/* Copy link */}
                  <button
                    onClick={() => handleShareOption("Copy")}
                    className="w-full flex items-center gap-4 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Copy className="w-5 h-5 text-white/70" />
                    </div>
                    <div className="text-left">
                      <div className="text-white font-bold">{copiedLink ? "Copied!" : "Copy Link"}</div>
                      <div className="text-white/50 text-xs mt-0.5">{shareUrl}</div>
                    </div>
                  </button>
                </div>

                {/* External Shares Grid */}
                <div>
                  <div className="flex justify-between items-center mb-3 px-1">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Share Externally</p>
                  </div>
                  
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-y-4 gap-x-2">
                    {SOCIAL_PLATFORMS.filter(p => p.id !== 'copy').map(p => (
                      <button key={p.id} onClick={() => handleShareOption(p.label)} className="flex flex-col items-center gap-1.5 group">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform text-xl border"
                          style={{ background: p.bg, borderColor: (p as any).border ? 'rgba(255,255,255,0.15)' : 'transparent' }}
                        >
                          {p.svg ? p.svg : <span>{p.emoji}</span>}
                        </div>
                        <span className="text-[11px] text-gray-300 font-medium whitespace-nowrap">{p.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-5 flex flex-col pt-4 h-[60vh] sm:h-[70vh]">
                <div className="flex justify-between items-center mb-4 shrink-0">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setActiveView('share')} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white">
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <h3 className="font-bold text-white text-lg">Send to...</h3>
                  </div>
                  <button onClick={onClose} className="p-1.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
                
                <div className="relative mb-4 shrink-0">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search contacts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm outline-none focus:border-[#B026FF]/50 transition-colors"
                  />
                </div>

                <div className="overflow-y-auto no-scrollbar flex-1 mb-4 flex flex-col gap-1 min-h-0">
                  {filteredContacts.map(u => {
                    const isSelected = selectedContacts.includes(u.id);
                    return (
                      <button
                        key={u.id}
                        onClick={() => toggleContact(u.id)}
                        className={\`flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors text-left \${isSelected ? "bg-white/10" : ""}\`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/10">
                            <img src={u.avatar} alt={u.displayName} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="text-white font-semibold flex items-center gap-1.5">
                              {u.displayName}
                              {u.isVerified && (
                                <div className="w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center">
                                  <Check className="w-2.5 h-2.5 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="text-sm text-gray-400">@{u.username}</div>
                          </div>
                        </div>
                        <div className={\`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors \${isSelected ? "bg-[#B026FF] border-[#B026FF]" : "border-white/20"}\`}>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={handleSendInApp}
                  disabled={selectedContacts.length === 0}
                  className={\`w-full py-3.5 rounded-full font-bold shadow-lg transition-all shrink-0 \${selectedContacts.length > 0 ? "bg-gradient-to-r from-[#B026FF] to-[#00F0FF] text-white hover:opacity-90" : "bg-white/10 text-white/40 cursor-not-allowed"}\`}
                >
                  {selectedContacts.length > 0
                    ? \`Send to \${selectedContacts.length} ⚡\`
                    : "Send ⚡"}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
`

const newContent = content.substring(0, startIndex) + newComponent;
fs.writeFileSync('src/components/PulseSheets.tsx', newContent);
console.log("Successfully updated PulseSheets.tsx");
