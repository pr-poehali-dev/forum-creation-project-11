import { useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatSectionProps {
  isAuthenticated: boolean;
  chatMessages: Array<{
    id: number;
    author: string;
    avatar: string;
    text: string;
    timestamp: string;
  }>;
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  setIsAuthOpen: (open: boolean) => void;
}

export default function ChatSection({
  isAuthenticated,
  chatMessages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  setIsAuthOpen,
}: ChatSectionProps) {
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="max-w-4xl mx-auto">
      {isAuthenticated ? (
        <Card className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 border-orange-500/30">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-3">
              <Icon name="MessagesSquare" size={32} />
              Общий чат
            </CardTitle>
            <CardDescription>Обсуждайте темы в реальном времени</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ScrollArea className="h-[400px] rounded-lg border border-border bg-card/50 p-4" ref={chatScrollRef}>
                <div className="space-y-4">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="flex items-start gap-3 animate-fade-in">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={msg.avatar} />
                        <AvatarFallback>{msg.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{msg.author}</span>
                          <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                        </div>
                        <p className="text-sm bg-muted px-3 py-2 rounded-lg inline-block">
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="flex gap-2">
                <Input
                  placeholder="Введите сообщение..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} className="gap-2">
                  <Icon name="Send" size={18} />
                  Отправить
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 border-orange-500/30">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-3">
              <Icon name="MessagesSquare" size={32} />
              Чат
            </CardTitle>
            <CardDescription>Общайтесь в реальном времени</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Icon name="Lock" size={48} className="mx-auto mb-4 opacity-50 text-muted-foreground" />
              <p className="text-lg font-semibold mb-2">Чат доступен только авторизованным пользователям</p>
              <p className="text-muted-foreground mb-4">Войдите в систему, чтобы начать общение</p>
              <Button onClick={() => setIsAuthOpen(true)} className="gap-2">
                <Icon name="LogIn" size={18} />
                Войти
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
