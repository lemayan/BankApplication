'use client'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = ({user}: MobileNavProps) => {
    const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px]">
        <Sheet>
          <SheetTrigger>
            <Image
            src = "/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
            
            
            />
          </SheetTrigger>
         <SheetContent side="left" className="border-none bg-white">
            <SheetHeader>
              <SheetTitle className="sr-only">Main Navigation</SheetTitle>
            </SheetHeader>
            <Link href="/" className=" cursor-pointer flex items-center gap-1 px-4">
              <Image 
                src="/icons/logo.svg"
                width={34}
                height={34}
                alt="Horizon logo"
                
              />
              <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Ivy Banking</h1>
            </Link>
            <div className="mobilenav-sheet">
                <SheetClose asChild>   
                    <nav className="flex h-full flex-col gap-6 pt-16 tex-white">
                        
                        {sidebarLinks.map((item) => {
              const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);

              return (
                <SheetClose asChild key={item.route}>
                    <Link
                  href={item.route}
                  key={item.label}
                  className={cn('sidebar-link', { 'bg-bank-gradient': isActive })}
                >
                  <div className="relative size-6">
                    <Image
                      src={item.imgURL}
                      alt={item.label}
                      fill
                      className={cn({
                        'brightness-[3] invert-0': isActive,
                      })}
                    />
                  </div>
                  <p className={cn('sidebar-label', { '!text-white': isActive })}>
                    {item.label}
                  </p>
                </Link>


                </SheetClose>
                

                
              );
            })}
                        
                        </nav> 

                </SheetClose>

            </div>
         
            </SheetContent>
         </Sheet>
    </section>
  )
}

export default MobileNav