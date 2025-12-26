import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PrivateMessage } from '@/types/forum';
import { emojiList } from '@/data/mockData';

interface PrivateMessagesSectionProps {
  currentUserId: string;
}

const mockUsers = [
  { id: 'u1', name: 'Алексей', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
  { id: 'u2', name: 'Мария', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria' },
  { id: 'u3', name: 'Дмитрий', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry' },
];

export default function PrivateMessagesSection({ currentUserId }: PrivateMessagesSectionProps) {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [messages, setMessages] = useState<PrivateMessage[]>([
    {
      id: 'pm1',
      fromUserId: 'u1',
      toUserId: currentUserId,
      text: 'Привет! Как дела?',
      timestamp: '10:30',
      isRead: true,
    },
    {
      id: 'pm2',
      fromUserId: currentUserId,
      toUserId: 'u1',
      text: 'Отлично! А у тебя?',
      timestamp: '10:32',
      isRead: true,
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUser) {
      const message: PrivateMessage = {
        id: `pm${messages.length + 1}`,
        fromUserId: currentUserId,
        toUserId: selectedUser,
        text: newMessage,
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        isRead: false,
      };
      setMessages([...messages, message]);
      setNewMessage('');
      setShowEmojiPicker(false);
    }
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    setTimeout(() => {
      if (selectedUser) {
        const message: PrivateMessage = {
          id: `pm${messages.length + 1}`,
          fromUserId: currentUserId,
          toUserId: selectedUser,
          voiceUrl: 'voice-message.mp3',
          timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
          isRead: false,
        };
        setMessages([...messages, message]);
        setIsRecording(false);
      }
    }, 2000);
  };

  const addEmoji = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
  };

  const selectedUserData = mockUsers.find(u => u.id === selectedUser);
  const userMessages = selectedUser
    ? messages.filter(m => (m.fromUserId === selectedUser && m.toUserId === currentUserId) || (m.fromUserId === currentUserId && m.toUserId === selectedUser))
    : [];

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 border-violet-500/20">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-3">
            <Icon name="Mail" size={32} />
            Личные сообщения
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-1 space-y-2">
              <h3 className="font-semibold mb-3">Диалоги</h3>
              <ScrollArea className="h-[500px]">
                <div className="space-y-2">
                  {mockUsers.map((user) => {
                    const unreadCount = messages.filter(
                      m => m.fromUserId === user.id && m.toUserId === currentUserId && !m.isRead
                    ).length;
                    return (
                      <button
                        key={user.id}
                        onClick={() => setSelectedUser(user.id)}
                        className={`w-full p-3 rounded-lg border transition-all ${
                          selectedUser === user.id
                            ? 'bg-primary/20 border-primary'
                            : 'bg-card border-border hover:bg-muted'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 text-left">
                            <p className="font-semibold">{user.name}</p>
                            {unreadCount > 0 && (
                              <Badge variant="destructive" className="mt-1">{unreadCount} новых</Badge>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>

            <div className="md:col-span-2">
              {selectedUser && selectedUserData ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={selectedUserData.avatar} />
                      <AvatarFallback>{selectedUserData.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold">{selectedUserData.name}</h3>
                  </div>

                  <ScrollArea className="h-[400px] rounded-lg border border-border bg-card/50 p-4" ref={chatScrollRef}>
                    <div className="space-y-4">
                      {userMessages.map((msg) => {
                        const isOwn = msg.fromUserId === currentUserId;
                        const sender = mockUsers.find(u => u.id === msg.fromUserId);
                        return (
                          <div key={msg.id} className={`flex items-start gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}>
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={sender?.avatar} />
                              <AvatarFallback>{sender?.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className={`flex-1 ${isOwn ? 'text-right' : ''}`}>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                              </div>
                              {msg.voiceUrl ? (
                                <div className={`inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-lg`}>
                                  <Icon name="Mic" size={16} />
                                  <span className="text-sm">Голосовое сообщение</span>
                                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                    <Icon name="Play" size={14} />
                                  </Button>
                                </div>
                              ) : (
                                <p className={`text-sm px-4 py-2 rounded-lg inline-block ${isOwn ? 'bg-primary' : 'bg-muted'}`}>
                                  {msg.text}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>

                  <div className="space-y-2">
                    {showEmojiPicker && (
                      <div className="flex flex-wrap gap-2 p-3 rounded-lg bg-muted">
                        {emojiList.map((emoji, i) => (
                          <button
                            key={i}
                            onClick={() => addEmoji(emoji)}
                            className="text-2xl hover:scale-125 transition-transform"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      >
                        <Icon name="Smile" size={18} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleVoiceRecord}
                        className={isRecording ? 'bg-destructive' : ''}
                      >
                        <Icon name="Mic" size={18} />
                      </Button>
                      <Input
                        placeholder="Введите сообщение..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} className="gap-2">
                        <Icon name="Send" size={18} />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-[500px] flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Icon name="MessageCircle" size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Выберите диалог для начала общения</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
