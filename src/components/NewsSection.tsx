import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface NewsSectionProps {
  userRole: 'user' | 'moderator' | 'admin';
  mockNews: Array<{
    id: number;
    title: string;
    content: string;
    author: string;
    category: string;
    timestamp: string;
  }>;
}

export default function NewsSection({ userRole, mockNews }: NewsSectionProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Icon name="Newspaper" size={32} />
            Новости
          </h2>
          <p className="text-muted-foreground mt-1">Последние события и анонсы</p>
        </div>
        {userRole === 'admin' && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-to-r from-primary to-secondary">
                <Icon name="Plus" size={18} />
                Опубликовать новость
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Новая новость</DialogTitle>
                <DialogDescription>Создайте объявление для всех пользователей</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Заголовок</label>
                  <Input placeholder="Важное объявление..." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Категория</label>
                  <Select defaultValue="news">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="news">Ежедневные новости</SelectItem>
                      <SelectItem value="bloggers">Блогеры</SelectItem>
                      <SelectItem value="crypto">Криптовалюта</SelectItem>
                      <SelectItem value="finance">Финансы и банки</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Содержание</label>
                  <Textarea placeholder="Текст новости..." rows={6} />
                </div>
                <Button className="w-full">Опубликовать</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      <div className="space-y-3">
        {mockNews.map((news) => (
          <Card key={news.id} className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-purple-500/20 animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-3">
                <Icon name="Megaphone" size={24} className="text-primary mt-1" />
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-2">{news.title}</h3>
                  <p className="text-muted-foreground mb-3">{news.content}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="User" size={14} />
                      {news.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      {news.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
