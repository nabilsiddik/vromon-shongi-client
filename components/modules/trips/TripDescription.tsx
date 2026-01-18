'use client'

import { Button } from '@/components/ui/button'
import { shortText } from '@/utils/shortText'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import {motion} from 'motion/react'

const TripDescription = ({description}: {description: string}) => {

    const [open, setOpen] = useState<boolean>(false)

    return (
        <div className="mt-3">
            <p>{shortText(description, open ? description?.length : 600)}</p>
            <Button onClick={() => setOpen((o) => !o)} className='mt-3 w-full cursor-pointer py-5' variant={'outline'}>{open ? 'Read Less' : 'Read More'} {open ? <ChevronUp/> : <ChevronDown/>}</Button>
        </div>
    )
}

export default TripDescription