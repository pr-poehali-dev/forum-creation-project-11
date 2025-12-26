import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { mockQuests } from '@/data/mockData';
import { Quest } from '@/types/forum';

interface QuestsSectionProps {
  quests: Quest[];
  onCompleteQuest: (questId: string, reward: number) => void;
}

export default function QuestsSection({ quests, onCompleteQuest }: QuestsSectionProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 border-violet-500/20">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-3">
            <Icon name="Target" size={32} />
            Задания
          </CardTitle>
          <CardDescription>Выполняйте задания и получайте награды</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {quests.map((quest) => (
            <Card key={quest.id} className={`border-2 ${quest.completed ? 'bg-primary/10 border-primary/50' : 'border-border'}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{quest.title}</h3>
                      {quest.completed && <Badge className="bg-green-500">Выполнено</Badge>}
                    </div>
                    <p className="text-muted-foreground mb-4">{quest.description}</p>
                    <div className="flex items-center gap-2">
                      <Icon name="Coins" size={20} className="text-amber-500" />
                      <span className="font-semibold text-lg">+{quest.reward} монет</span>
                    </div>
                  </div>
                  {!quest.completed && (
                    <Button onClick={() => onCompleteQuest(quest.id, quest.reward)}>
                      Выполнить
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
