import React, { useEffect, useState } from 'react'
import PageLikePanel from '@/components/panel/PageLikePanel'
import Link from '@/components/custom-ui/Link'
import Button from '@/components/custom-ui/Button'
import { getIcon } from '@/components/icon'
import confetti from 'canvas-confetti'

interface ObtainSunshinesDialogProps {
  isOpen: boolean
  sunshines: number
  totalSunshines: number
  galaxyId: string
  projectName?: string
  uri?: string
  onClose: () => void
}

const ObtainSunshinesDialog: React.FC<ObtainSunshinesDialogProps> = ({
  isOpen,
  sunshines,
  galaxyId,
  projectName,
  uri,
  onClose,
}) => {
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false)

  useEffect(() => {
    if (isOpen && !hasTriggeredConfetti) {
      setHasTriggeredConfetti(true)
      const duration = 3000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 }

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min
      }

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          clearInterval(interval)
          return
        }

        const particleCount = 50 * (timeLeft / duration)
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        })
      }, 250)
    }
  }, [isOpen, hasTriggeredConfetti])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm z-[100]"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] flex items-center justify-center w-full max-w-2xl px-4">
        <PageLikePanel
          title={
            <div className="flex items-center justify-center gap-2">
              {getIcon({ iconType: 'sunshine', className: 'w-8 h-8 text-yellow-500 dark:text-yellow-400' })}
              <span className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
                {sunshines.toFixed(1)}
              </span>
            </div>
          }
          titleCenter={true}
        >
          <div className="space-y-6">
            {/* Project Name */}
            {projectName && (
              <div className="text-center">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                  {projectName}
                </h3>
              </div>
            )}

            {/* Message */}
            <div className="text-slate-600 dark:text-slate-400 text-center space-y-2">
              <p className="text-base">
                These sunshines are possible to convert into{' '}
                {projectName && uri ? (
                  <Link
                    uri={uri}
                    className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    {projectName}
                  </Link>
                ) : (
                  <span className="font-semibold">{projectName || 'this project'}</span>
                )}
                {' '}stars{' '}
                <span className="inline-flex items-center">
                  {getIcon({
                    iconType: 'star-filled',
                    className: 'w-5 h-5 text-yellow-500 dark:text-yellow-400 animate-pulse'
                  })}
                </span>
              </p>
            </div>

            {/* Action Button */}
            <div className="flex justify-center items-center gap-4">
              <p className="text-base">
                Next step
              </p>
              <Link uri={uri || `/project/issues?galaxy=${galaxyId}`}>
                <Button variant="primary" size="md">
                  Create an issue
                </Button>
              </Link>
            </div>
          </div>
        </PageLikePanel>
      </div>
    </>
  )
}

export default ObtainSunshinesDialog

