import { useTheme } from 'next-themes';

const Background = () => {

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black fixed overflow-hidden -z-50">
        <div
            className="absolute inset-0 z-0 pointer-events-none dark:pointer-events-auto"
            style={{
            background:
                "radial-gradient(70% 55% at 50% 50%, #2a5d77 0%, #184058 18%, #0f2a43 34%, #0a1b30 50%, #071226 66%, #040d1c 80%, #020814 92%, #01040d 97%, #000309 100%), radial-gradient(160% 130% at 10% 10%, rgba(0,0,0,0) 38%, #000309 76%, #000208 100%), radial-gradient(160% 130% at 90% 90%, rgba(0,0,0,0) 38%, #000309 76%, #000208 100%)"
            }}
        />
        {/* {
            theme === "light" && (
                <div 
                    className="absolute inset-0 z-0 pointer-events-none" 
                    style={{
                        backgroundImage: `
                            radial-gradient(circle at center, #10b981, transparent)
                        `,
                        backgroundSize: `100% 100%`
                    }} 
                />
            )
        } */}
    </div>
  )
}

export default Background