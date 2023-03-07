import { getAllDocBySpcId } from "@/api/docApi";
import { SpaceLayout, File, Button, Folder } from "@/components";
import { STATUS_TYPE } from "@/core/Constants";
import { useNotify } from "@/hooks/NotificationHook";
import {
  DownOutlined,
  UpOutlined
} from "@ant-design/icons";
import { Breadcrumb } from 'antd';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function FolderComp() {

  const [ icon , setIcon ] = useState(false);
  const [ lstFile, setLstFile] = useState([]);
  const notify = useNotify();
  const [ condition, setCondition ] = useState(false);
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    const fetchSpace = async () => {
      if (!router.isReady) return;
      const {data, success, message} = await getAllDocBySpcId(id);
      if (success) {
        setLstFile(data);
      } else {
        return notify(STATUS_TYPE.ERROR, message);
      }
    };
    fetchSpace();
  }, [ condition, router.isReady ]);
 
  const handleCondition = () => {
    setCondition(!condition);
  }

  const handleClickFolder = (id) => {
    const newLstFile = lstFile.map((header) => {
      if ( header.hdrId === id && header.clicked !== true) {
        header.clicked = true;
        return header;
      } else {
        header.clicked = false;
        return header;
      }
    });
    setLstFile(newLstFile);
  }

  return (
    <SpaceLayout handleCondition = {handleCondition}>
        <div className="container-fluid pl-12">
          <div className="flex w-full justify-between">
          <Breadcrumb separator=">">
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="">{lstFile && lstFile.length !==0 ? lstFile[0].spcNm : 'undefined'}</Breadcrumb.Item>
          </Breadcrumb>
            <div className="flex">
              <p className="mr-[10px] pt-1">Name</p>
              <Button size='small' variant='icon' onClick={() => setIcon(!icon) } >{!icon ? <DownOutlined /> : <UpOutlined />}</Button>
            </div>
          </div>
          <div className="grid grid-cols-6">
            {lstFile && lstFile.length !== 0 ? 
              lstFile.map(header => (
                <Folder key={header.hdrId} id={header.hdrId} name={header.hdrNm} 
                handleClickFolder={handleClickFolder} 
                clicked={header.clicked}/> 
              ))
            : <p className="text-[20px]"> No space created !</p>}
           </div>
        </div>
    </SpaceLayout>
  )
}
