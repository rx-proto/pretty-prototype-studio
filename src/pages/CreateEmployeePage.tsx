import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, Sparkles, ArrowLeft, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const channelOptions = ["Slack", "Email", "Lark", "Webhook"];
const skillOptions = ["Market Watch", "Research Briefs", "Escalation Triage", "Launch Checklist", "Deal Risk Radar", "Follow-through"];
const teamOptions = ["Growth", "Support Ops", "Operations", "Revenue", "Research", "Customer Success"];

export default function CreateEmployeePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [team, setTeam] = useState("");
  const [summary, setSummary] = useState("");
  const [weeklyBudget, setWeeklyBudget] = useState("");
  const [defaultRoute, setDefaultRoute] = useState("");
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleItem = (item: string, list: string[], setList: (v: string[]) => void) => {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  const handleCreate = () => {
    if (!name || !title || !team) {
      toast.error("Please fill in the required fields");
      return;
    }
    toast.success(`${name} has been created successfully!`);
    navigate("/preview/employees");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-state-accent flex items-center justify-center shadow-lg shadow-primary/20">
              <UserPlus className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Create Employee</h1>
              <p className="text-xs text-muted-foreground">Set up a new AI employee for your workspace</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Identity */}
          <section className="rounded-xl border border-border/60 bg-card p-5 space-y-4 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Identity
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Name *</label>
                <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Maya" className="h-9 text-sm" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Team *</label>
                <select
                  value={team}
                  onChange={e => setTeam(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select team</option>
                  {teamOptions.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Title *</label>
              <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Competitive intelligence lead" className="h-9 text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Summary</label>
              <Textarea value={summary} onChange={e => setSummary(e.target.value)} placeholder="What does this employee do?" className="text-sm min-h-[80px] resize-none" />
            </div>
          </section>

          {/* Skills */}
          <section className="rounded-xl border border-border/60 bg-card p-5 space-y-3 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map(skill => (
                <button
                  key={skill}
                  onClick={() => toggleItem(skill, selectedSkills, setSelectedSkills)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 border ${
                    selectedSkills.includes(skill)
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "bg-muted/30 border-border/60 text-muted-foreground hover:border-border hover:text-foreground"
                  }`}
                >
                  {selectedSkills.includes(skill) ? <X className="w-3 h-3 inline mr-1" /> : <Plus className="w-3 h-3 inline mr-1" />}
                  {skill}
                </button>
              ))}
            </div>
          </section>

          {/* Channels & Budget */}
          <section className="rounded-xl border border-border/60 bg-card p-5 space-y-4 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground">Channels & Budget</h2>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Channels</label>
              <div className="flex flex-wrap gap-2">
                {channelOptions.map(ch => (
                  <button
                    key={ch}
                    onClick={() => toggleItem(ch, selectedChannels, setSelectedChannels)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 border ${
                      selectedChannels.includes(ch)
                        ? "bg-primary/10 border-primary/30 text-primary"
                        : "bg-muted/30 border-border/60 text-muted-foreground hover:border-border hover:text-foreground"
                    }`}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Weekly budget (credits)</label>
                <Input type="number" value={weeklyBudget} onChange={e => setWeeklyBudget(e.target.value)} placeholder="e.g. 150" className="h-9 text-sm" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Default route</label>
                <Input value={defaultRoute} onChange={e => setDefaultRoute(e.target.value)} placeholder="e.g. Slack #channel" className="h-9 text-sm" />
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => navigate(-1)} className="text-xs h-9">
              Cancel
            </Button>
            <Button onClick={handleCreate} className="text-xs h-9 gap-1.5 shadow-md shadow-primary/20">
              <UserPlus className="w-3.5 h-3.5" />
              Create Employee
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
