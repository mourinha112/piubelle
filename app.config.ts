export default defineAppConfig({
  ui: {
    primary: 'lilac',
    gray: 'neutral',
    
    // Custom button styles
    button: {
      rounded: 'rounded-2xl',
      default: {
        size: 'lg'
      }
    },
    
    // Custom input styles
    input: {
      rounded: 'rounded-xl',
      default: {
        size: 'lg'
      }
    },
    
    // Custom card styles
    card: {
      rounded: 'rounded-3xl',
      shadow: 'shadow-soft',
      background: 'bg-white/80 backdrop-blur-xl',
      ring: 'ring-1 ring-lilac-100/50'
    },
    
    // Custom modal styles
    modal: {
      rounded: 'rounded-3xl',
      shadow: 'shadow-soft-lg',
      background: 'bg-white',
      overlay: {
        background: 'bg-rose-950/20 backdrop-blur-sm'
      }
    },
    
    // Notifications
    notifications: {
      position: 'top-0 bottom-auto'
    }
  }
})
