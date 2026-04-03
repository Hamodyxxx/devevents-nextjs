"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

/**
 * Renders the root Dialog element with a `data-slot="dialog"` attribute.
 *
 * Forwards all received props to the underlying Dialog primitive.
 *
 * @returns A React element for the dialog root with `data-slot="dialog"` and all provided props forwarded.
 */
function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

/**
 * Wraps the Radix Dialog Trigger and injects a `data-slot="dialog-trigger"` attribute while forwarding all props.
 *
 * @returns A `DialogPrimitive.Trigger` element with `data-slot="dialog-trigger"` and the provided props applied.
 */
function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

/**
 * Renders the dialog portal element with a stable `data-slot` attribute for styling and selectors.
 *
 * @param props - Props forwarded to the underlying Radix `Portal` primitive
 * @returns A React element rendering the dialog portal
 */
function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

/**
 * Renders a Radix `DialogPrimitive.Close` with a standardized `data-slot="dialog-close"`.
 *
 * @returns A `DialogPrimitive.Close` element with the provided props and `data-slot="dialog-close"`.
 */
function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

/**
 * Renders the dialog overlay with default positioning, backdrop, z-index, and open/close animation classes.
 *
 * @param className - Additional CSS classes to merge with the component's default overlay classes
 * @param props - Remaining props forwarded to the underlying Radix `DialogPrimitive.Overlay`
 * @returns The rendered overlay element
 */
function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders dialog content inside a portal with an overlay and an optional close button.
 *
 * @param className - Additional CSS classes appended to the dialog content container.
 * @param showCloseButton - Whether to render the top-right close icon button; defaults to `true`.
 * @returns The rendered dialog content element (wrapped in a portal and overlay).
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot="dialog-close" asChild>
            <Button
              variant="ghost"
              className="absolute top-2 right-2"
              size="icon-sm"
            >
              <XIcon
              />
              <span className="sr-only">Close</span>
            </Button>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

/**
 * Layout container for a dialog's header area.
 *
 * Renders a `div` with `data-slot="dialog-header"`, merges the default header classes
 * (`flex flex-col gap-2`) with an optional `className`, and forwards remaining props.
 *
 * @param className - Additional CSS classes to merge with the default header classes
 * @returns A `div` element used as the dialog header
 */
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

/**
 * Renders the dialog footer container and optional "Close" action.
 *
 * The footer arranges children with responsive layout and styling, and when `showCloseButton` is `true` renders a Close button that triggers the dialog close action.
 *
 * @param showCloseButton - Whether to render a Close button in the footer (default: `false`)
 * @returns The rendered dialog footer element
 */
function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

/**
 * Dialog title element that applies consistent typography and a `data-slot` attribute.
 *
 * Renders Radix `DialogPrimitive.Title`, merges the provided `className` with the component's
 * default heading styles, and forwards all other props to the underlying element.
 *
 * @returns A React element rendering the dialog title with merged classes and `data-slot="dialog-title"`.
 */
function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-heading text-base leading-none font-medium",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a styled dialog description element for use inside Dialog components.
 *
 * @returns A `DialogPrimitive.Description` element with `data-slot="dialog-description"`, default muted text and link styling, and any provided `className` merged into the defaults.
 */
function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
