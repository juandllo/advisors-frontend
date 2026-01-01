// import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react'
import { ModalProps } from '@/interfaces/iModalProps'
import { Button } from './ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle
} from "@/components/ui/dialog";

export default function Modal({
  children,
  title,
  description,
  openTriggerValue
}: ModalProps) {

  return <>
    <Dialog>
      <DialogTrigger asChild>
        <Button>{openTriggerValue}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description &&
            <DialogDescription>{description}</DialogDescription>
          }
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  </>
}
