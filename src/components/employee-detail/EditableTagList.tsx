import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Pencil, X, Plus, Check, Search } from "lucide-react";
import { skills as allSkills, tools as allTools } from "@/lib/data";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface EditableTagListProps {
  items: string[];
  type: "skills" | "tools";
  icon: React.ReactNode;
  label: string;
}

export function EditableTagList({ items: initialItems, type, icon, label }: EditableTagListProps) {
  const [items, setItems] = useState(initialItems);
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState("");

  const allOptions = type === "skills"
    ? allSkills.map(s => ({ name: s.name, summary: s.summary }))
    : allTools.map(t => ({ name: t.name, summary: t.summary }));

  const available = useMemo(() => {
    const opts = allOptions.filter(o => !items.includes(o.name));
    if (!search.trim()) return opts;
    const q = search.toLowerCase();
    return opts.filter(o =>
      o.name.toLowerCase().includes(q) || o.summary.toLowerCase().includes(q)
    );
  }, [items, search, allOptions]);

  const handleRemove = (item: string) => {
    setItems(items.filter(i => i !== item));
  };

  const handleAdd = (item: string) => {
    setItems([...items, item]);
  };

  const tagStyle = type === "skills"
    ? "bg-primary/[0.06] text-primary ring-1 ring-inset ring-primary/10"
    : "bg-muted text-foreground";

  return (
    <>
      <div className="card-premium rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {icon}
            <h3 className="section-label">{label}</h3>
          </div>
          <button
            onClick={() => { setSearch(""); setIsEditing(true); }}
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {items.map((item) => (
            <span key={item} className={cn("px-2.5 py-1 text-[11px] font-medium rounded-lg", tagStyle)}>
              {item}
            </span>
          ))}
          {items.length === 0 && (
            <p className="text-[12px] text-muted-foreground">None configured</p>
          )}
        </div>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[400px] max-h-[85vh] flex flex-col overflow-hidden" onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="text-[15px]">Edit {label}</DialogTitle>
            <DialogDescription className="text-[13px]">
              Add or remove {label.toLowerCase()} for this employee.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pr-1">
            {/* Current items */}
            <div className="space-y-2">
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Active</p>
              {items.length === 0 ? (
                <p className="text-[12px] text-muted-foreground py-2">No {label.toLowerCase()} assigned.</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {items.map(item => (
                    <button
                      key={item}
                      onClick={() => handleRemove(item)}
                      className={cn(
                        "group inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-lg transition-all duration-200 hover:bg-destructive/10 hover:text-destructive",
                        tagStyle
                      )}
                    >
                      {item}
                      <X className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Available items with search */}
            <div className="space-y-2">
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Available</p>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={`Search ${label.toLowerCase()}...`}
                  className="pl-8 h-8 text-[12px]"
                />
              </div>
              <div className="space-y-0.5 max-h-[180px] overflow-y-auto">
                {available.length === 0 ? (
                  <p className="text-[12px] text-muted-foreground py-3 text-center">
                    {search ? "No matches found" : `All ${label.toLowerCase()} assigned`}
                  </p>
                ) : (
                  available.map(option => (
                    <button
                      key={option.name}
                      onClick={() => handleAdd(option.name)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-muted/50 transition-colors duration-150 group"
                    >
                      <Plus className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary transition-colors flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-medium text-foreground truncate">{option.name}</p>
                        <p className="text-[11px] text-muted-foreground truncate">{option.summary}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(false)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-[12px] font-medium hover:bg-primary/90 transition-colors flex-shrink-0"
          >
            <Check className="w-3.5 h-3.5" />
            Done
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
