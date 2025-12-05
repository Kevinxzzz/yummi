import { Link } from "react-router-dom";
import { User, BookOpen, Settings, LogOut } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import type { SideBarType } from "@/types/sideBar";



export const SideBar = ({ open, setOpen }: SideBarType) => {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="bg-card border-border">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-bold text-foreground">
            Menu
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-2">
          <Link to="/profile" onClick={() => setOpen(false)}>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-14 text-base rounded-2xl hover:bg-secondary transition-all"
            >
              <User className="h-5 w-5" />
              <span>Perfil</span>
            </Button>
          </Link>

          <Link to="/myRecipes" onClick={() => setOpen(false)}>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-14 text-base rounded-2xl hover:bg-secondary transition-all"
            >
              <BookOpen className="h-5 w-5" />
              <span>Minhas Receitas</span>
            </Button>
          </Link>

          <Link to="/settings" onClick={() => setOpen(false)}>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-14 text-base rounded-2xl hover:bg-secondary transition-all"
            >
              <Settings className="h-5 w-5" />
              <span>Configurações</span>
            </Button>
          </Link>

          <div className="my-2 border-t border-border" />

          <Link to="/login" onClick={() => setOpen(false)}>
            <Button
              onClick={logout}
              variant="ghost"
              className="w-full justify-start gap-3 h-14 text-base rounded-2xl hover:bg-destructive/10 hover:text-destructive transition-all"
            >
              <LogOut className="h-5 w-5" />
              <span>Fazer Logout</span>
            </Button>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
