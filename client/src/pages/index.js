import { SpaceLayout, Folder, Button } from "@/components";
import {
  DownOutlined,
  UpOutlined
} from "@ant-design/icons";
export default function Home() {
  let sort = false;
  return (
    <SpaceLayout>
        <div className="container-fluid pl-12">
          <div className="flex w-full justify-between">
            <p className="subheader">Space</p>
          <div className="flex">
            <p className="mr-[10px]">Name</p>
            <Button size='small'>{!sort ? <DownOutlined /> : <UpOutlined />}</Button>
          </div>
          </div>
          <Folder id='1' name='Test management'/>
        </div>
    </SpaceLayout>
  )
}
