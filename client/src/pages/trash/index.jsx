import { deleteSpace, getAllSpace, updateSpace } from "@/api/spaceApi";
import { SpaceLayout, Folder, Button, MoreMenu } from "@/components";
import { STATUS_TYPE } from "@/core/Constants";
import { useLoading } from "@/hooks/LoadingHook";
import { useNotify } from "@/hooks/NotificationHook";
import {
  DownOutlined,
  UpOutlined
} from "@ant-design/icons";
import { useEffect, useState } from "react";

export default function Trash() {
  const [ icon , setIcon ] = useState(false);
  const [ lstSpace, setLstSpace] = useState([]);
  const [ condition, setCondition ] = useState(false);

  const notify = useNotify();
  const [showLoading, hideLoading] = useLoading();

  useEffect(() => {
    const fetchSpace = async () => {
      const {data, success, message} = await getAllSpace(false);
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

  const handleMenuClick = async (key ,name, id) => {
    if ( key === 'restore') {
      try {
        showLoading();
        const { message, success} = await updateSpace({spcId: id, spcNm: name, actFlg: true});
        if ( success ) {
          handleCondition();
          notify(STATUS_TYPE.SUCCESS, 'Restore folder sucessfully!');
        } else {
          notify(STATUS_TYPE.WARNING, message);
        }
      } finally {
        hideLoading();
      }
    } else {
      try {
        showLoading();
        const { message, success} = await deleteSpace(id);
        if ( success ) {
          handleCondition();
          notify(STATUS_TYPE.SUCCESS, 'Delete permanent sucessfully!');
        } else {
          notify(STATUS_TYPE.WARNING, message);
        }
      } finally {
        hideLoading();
      }
    }
  };

  return (
    <SpaceLayout handleCondition = {handleCondition} title={'trash'}>
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
                <div className='flex'>
                  <Folder key={space.spcId} id={space.spcId} name={space.spcNm} 
                  handleClickFolder={handleClickFolder} 
                  clicked={space.clicked}
                  type='folder'
                  >
                    <MoreMenu onClick={(key) =>handleMenuClick(key, space.spcNm, space.spcId)} type={'trash'}/>
                  </Folder> 
                </div>
              ))
            : <p className="text-[20px]"> No trash !</p>}
           </div>
        </div>
    </SpaceLayout>
  )
}
