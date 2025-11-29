import type { Meta, StoryObj } from '@storybook/react'
import ProjectRating from './ProjectRating'

const meta: Meta<typeof ProjectRating> = {
    title: 'Components/Rating/ProjectRating',
    component: ProjectRating,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A project rating component that displays sunshines, stars, and purple energy percentage showing how much shines turned into stars.'
            }
        }
    },
    tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof ProjectRating>

// Default story
export const Default: Story = {
    args: {
        sunshines: 1250,
        stars: 3.47
    }
}

// Low sunshines and stars
export const LowSunshines: Story = {
    args: {
        sunshines: 720,
        stars: 2.0
    }
}

// High sunshines and stars
export const HighSunshines: Story = {
    args: {
        sunshines: 3600,
        stars: 10.0
    }
}

// Medium sunshines and stars
export const MediumSunshines: Story = {
    args: {
        sunshines: 1800,
        stars: 5.0
    }
}

// Low rating - 2/10 stars
export const LowRating: Story = {
    render: () => (
        <div className="space-y-4">
            <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Low Rating (2/10)</h3>
                <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                        {[1, 2].map((star) => (
                            <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                        {[3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                            <svg key={star} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900">2/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
            </div>
        </div>
    )
}

// Medium rating - 5/10 stars
export const MediumRating: Story = {
    render: () => (
        <div className="space-y-4">
            <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Medium Rating (5/10)</h3>
                <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                        {[6, 7, 8, 9, 10].map((star) => (
                            <svg key={star} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900">5/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                </div>
            </div>
        </div>
    )
}

// High rating - 8/10 stars
export const HighRating: Story = {
    render: () => (
        <div className="space-y-4">
            <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">High Rating (8/10)</h3>
                <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((star) => (
                            <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                        {[9, 10].map((star) => (
                            <svg key={star} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900">8/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
            </div>
        </div>
    )
}

// Perfect rating - 10/10 stars
export const PerfectRating: Story = {
    render: () => (
        <div className="space-y-4">
            <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Perfect Rating (10/10)</h3>
                <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                            <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900">10/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
            </div>
        </div>
    )
}

// No rating - 0/10 stars
export const NoRating: Story = {
    render: () => (
        <div className="space-y-4">
            <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">No Rating (0/10)</h3>
                <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                            <svg key={star} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900">0/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
            </div>
        </div>
    )
}

// Rating progression showcase
export const RatingProgression: Story = {
    render: () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center mb-6">Project Rating Progression</h3>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                <div key={rating} className="flex items-center space-x-4">
                    <span className="w-8 text-sm font-medium">{rating}/10:</span>
                    <div className="flex items-center space-x-1">
                        <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                                <svg
                                    key={star}
                                    className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{rating}/10</span>
                    </div>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${rating * 10}%` }}></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

// Interactive showcase with hover tooltip
export const InteractiveShowcase: Story = {
    render: () => (
        <div className="space-y-8">
            <h3 className="text-xl font-semibold text-center mb-6">Interactive Project Rating Component</h3>
            <div className="text-center">
                <p className="text-gray-600 mb-4">Hover over the energy percentage to see how much shines turned into stars</p>
                <ProjectRating sunshines={1250} stars={3.47} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                    <h4 className="font-semibold mb-2">Low Sunshines</h4>
                    <ProjectRating sunshines={720} stars={2.0} />
                </div>
                <div className="text-center">
                    <h4 className="font-semibold mb-2">High Sunshines</h4>
                    <ProjectRating sunshines={3600} stars={10.0} />
                </div>
            </div>
        </div>
    )
}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                    <h4 className="font-semibold mb-2">Low Progress (2/10)</h4>
                    <div className="flex items-center space-x-1">
                        <div className="flex space-x-1">
                            {[1, 2].map((star) => (
                                <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                            {[3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                                <svg key={star} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-sm font-medium text-gray-900">2/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-teal-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                </div>
                <div className="text-center">
                    <h4 className="font-semibold mb-2">High Progress (8/10)</h4>
                    <div className="flex items-center space-x-1">
                        <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((star) => (
                                <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                            {[9, 10].map((star) => (
                                <svg key={star} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-sm font-medium text-gray-900">8/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-teal-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
