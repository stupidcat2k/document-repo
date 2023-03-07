import { getAllSpace } from "@/api/spaceApi";
import { SpaceLayout, Folder, Button } from "@/components";
import { STATUS_TYPE } from "@/core/Constants";
import { useNotify } from "@/hooks/NotificationHook";
import {
  DownOutlined,
  UpOutlined
} from "@ant-design/icons";
import { useEffect, useState } from "react";
export default function Home() {
  const [ icon , setIcon ] = useState(false);
  const [ lstSpace, setLstSpace] = useState([]);
  const notify = useNotify();
  const [ condition, setCondition ] = useState(false);

  useEffect(() => {
    const fetchSpace = async () => {
      const {data, success, message} = await getAllSpace();
      if (success) {
        setLstSpace(data);
      } else {
        return notify(STATUS_TYPE.ERROR, message);
      }
    };
    fetchSpace();
  }, [ condition ]);
  
  const handleCondition = () => {
    setCondition(!condition);
  }

  const handleClickFolder = (id) => {
    const newLstSpace = lstSpace.map((space) => {
      if ( space.spcId === id && space.clicked !== true) {
        space.clicked = true;
        return space;
      } else {
        space.clicked = false;
        return space;
      }
    });
    setLstSpace(newLstSpace);
  }
  return (
    <SpaceLayout handleCondition = {handleCondition}>
        <div className="container-fluid pl-12">
          <div className="flex w-full justify-between">
            <p className="subheader">Space</p>
            <div className="flex">
              <p className="mr-[10px] pt-1">Name</p>
              <Button size='small' variant='icon' onClick={() => setIcon(!icon) } >{!icon ? <DownOutlined /> : <UpOutlined />}</Button>
            </div>
          </div>
          <div className="grid grid-cols-6">
            {lstSpace && lstSpace.length !== 0 ? 
              lstSpace.map(space => (
                <Folder key={space.spcId} id={space.spcId} name={space.spcNm} 
                handleClickFolder={handleClickFolder} 
                clicked={space.clicked}
                type='folder'
                /> 
              ))
            : <p className="text-[20px]"> No space created !</p>}
           </div>
        </div>
    </SpaceLayout>
  )
}
