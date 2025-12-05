import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const languages = [
  { code: "pt-BR", name: "Português (BR)" },
  { code: "en", name: "English" },
];

interface ModalLanguageProps {
  languageModalOpen: boolean;
  setLanguageModalOpen: (open: boolean) => void;
}
export const ModalLanguage = ({languageModalOpen, setLanguageModalOpen}:ModalLanguageProps) => {
  return (
    <Dialog open={languageModalOpen} onOpenChange={setLanguageModalOpen}>
      <DialogContent className="rounded-2xl bg-card">
        <DialogHeader>
          <DialogTitle>Selecionar Idioma</DialogTitle>
        </DialogHeader>
         <div className="grid grid-cols-1 gap-4 mt-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className="
                group
                w-full p-2 text-left
                bg-card
                rounded-2xl border border-border
                shadow-sm
                hover:bg-background hover:shadow-lg
                transition-all duration-200
                flex items-center justify-between
              "
            >
              <div>
                <p className="font-semibold text-foreground text-mg">
                  {lang.name}
                </p>
                <p className="text-sm text-muted-foreground">{lang.code}</p>
              </div>

              <div
                className="
                  h-3 w-3 rounded-full border border-primary 
                  group-hover:bg-primary transition-colors
                "
              />
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
