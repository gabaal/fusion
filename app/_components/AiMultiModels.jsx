'use client'

import { useContext, useState } from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import AiModelList from './../../shared/AiModelList'
import Image from "next/image"
import { Switch } from "@/components/ui/switch"
import { Lock, LockIcon, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AiSelectedModel } from "@/context/AiSelectedModelContext"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/config/FirebaseConfig"
import { useUser } from "@clerk/nextjs"
function AiMultiModels() {

const { AiSelectedModels, setAiSelectedModels } = useContext(AiSelectedModel)
const {user} = useUser()
  const [aiModelList, setAiModelList] = useState(AiModelList)

  const onToggleChange = (model, value) => {
    setAiModelList((prev) =>
      prev.map((m) =>
        m.model === model ? { ...m, enable: value } : m))
  }

const onSelectValue = async (parentModel, value)=> {
  setAiSelectedModels((prev) => ({
    ...prev,
    [parentModel]: {
      
      modelId: value
    }
  }))

  const docRef=doc(db, 'users',user?.primaryEmailAddress?.emailAddress)
  await updateDoc(docRef, {
    selectedModelPref: AiSelectedModels
  })
}

  return (
    <div className="flex flex-1 h-[75vh] border-b">
      {aiModelList.map((model, index) => (
        <div key={index} className={`flex flex-col border-r h-full overflow-auto ${model.enable ? 'flex-1 min-w-[400px]' : 'min-w-[100px]'}`}>
          <div className="flex w-full items-center justify-between border-b p-4 h-[70px]" key={index}>
            <div className="flex items-center gap-4">
              <Image src={model.icon} alt={model.model} width={24} height={24} className="" />
              {model.enable && <Select defaultValue={AiSelectedModels[model.model].modelId} onValueChange={(value) => onSelectValue(model.model, value)} disabled={model.premium} >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={AiSelectedModels[model.model].modelId} />
                </SelectTrigger>
                <SelectContent>

                  <SelectGroup className='px-3'>
                    <SelectLabel className='text-sm text-gray-400'>Free</SelectLabel>
                    {model.subModel.map((subModel, index) => subModel.premium == false && (<SelectItem value={subModel.id} key={index}>{subModel.name}</SelectItem>))}
                    </SelectGroup>

                    <SelectGroup className='px-3'>
                    <SelectLabel className='text-sm text-gray-400'>Premium</SelectLabel>
                    {model.subModel.map((subModel, index) => subModel.premium == true && (<SelectItem disabled={subModel.premium} value={subModel.name} key={index}>{subModel.name} {subModel.premium&&<Lock className="h-4 w-4"/>}</SelectItem>))}
                    </SelectGroup >

                </SelectContent>
              </Select>}
            </div>
            <div>
              {model.enable ? <Switch checked={model.enable}
                onCheckedChange={(v) => onToggleChange(model.model, v)} /> : <MessageSquare onClick={() => onToggleChange(model.model, true)} />}
            </div>
          </div>
          {model.premium && model.enable && <div className="flex items-center justify-center h-full">
            <Button><LockIcon />Upgrade to unlock</Button>
          </div>}
        </div>
      ))}



    </div>
  )
}
export default AiMultiModels