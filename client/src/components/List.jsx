import { Typography, Tag } from 'antd';
import { useState } from 'react';

const ListItem = () => {
  const data = [
    {
        id:'1',
        prefix: '#',
        description: 'Used to denote a hashtag or topic on social media platforms.',
        color:'#ff0000'
      },
      {
        id:'2',
        prefix: '@',
        description: 'Used to mention or tag someone on social media platforms.',
        color:'#00ff44'
      },
      {
        id:'3',
        prefix: '$',
        description: 'Used to denote a currency symbol in finance.',
        color:'#ff00d0'
      }];

  const [selected, setSelected] = useState({id: ''});

  const handleClick = (item) => {
    if(selected !== null && item.id === selected.id){
       return setSelected({id: ''});
    }
    setSelected(item);
  };

  return (
    <ul>
      {data.map(item => (
        <li key={item.id} className={item.id === selected.id ? 'selected cursor' : ' cursor '} onClick={() => handleClick(item)}>
          <Tag color={item.color}>{item.prefix}</Tag>
          <br/>
          <Typography.Text>{item.description}</Typography.Text>
        </li>
      ))}
    </ul>
  );
}

export default ListItem;