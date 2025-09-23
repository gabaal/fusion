import { useState } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import AiModelList from './../../shared/AiModelList'
import Image from "next/image"
import { Switch } from "@/components/ui/switch"
import { LockIcon, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
function AiMultiModels() {
  const [aiModelList, setAiModelList] = useState(AiModelList)

  const onToggleChange =(model, value) => {
    setAiModelList((prev) =>
    prev.map((m)=>
    m.model ===model?{...m, enable: value}:m))
  }
  return (
    <div className="flex flex-1 h-[75vh] border-b">
      {aiModelList.map((model, index) => (
        <div className={`flex flex-col border-r h-full overflow-auto ${model.enable ? 'flex-1 min-w-[400px]' : 'min-w-[100px]'}`}>
        <div className="flex w-full items-center justify-between border-b p-4 h-[70px]" key={index}>
          <div className="flex items-center gap-4">
            <Image src={model.icon} alt={model.model} width={24} height={24} className="" />
            {model.enable && <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={model.subModel[0].name} />
              </SelectTrigger>
              <SelectContent>
                {model.subModel.map((subModel, index) => (<SelectItem value={subModel.name} key={index}>{subModel.name}</SelectItem>))}
              </SelectContent>
            </Select>}
          </div>
          <div>
           {model.enable ?  <Switch checked={model.enable} 
            onCheckedChange={(v)=> onToggleChange(model.model, v)}/>: <MessageSquare onClick={() => onToggleChange(model.model, true)}/>}
          </div>
        </div>
        {model.premium && model.enable &&<div className="flex items-center justify-center h-full">
        <Button><LockIcon/>Upgrade to unlock</Button>
      </div>}
        </div>
      ))}
      
      

    </div>
  )
}
export default AiMultiModels