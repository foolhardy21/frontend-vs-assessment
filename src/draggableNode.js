// draggableNode.js

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`${type} border border-[rgba(0,0,0,0.1)] shadow-md shadow-[rgba(0,0,0,0.1)]
      text-black flex items-center px-4 py-2 rounded-md bg-white text-[14px] font-normal
      hover:border-primary hover:text-primary hover:translate-y-[-5%] hover:shadow-lg transition-all duration-200
      `}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{
        cursor: 'grab',
        // minWidth: '80px', 
        // height: '60px',
        // display: 'flex', 
        // alignItems: 'center', 
        // borderRadius: '8px',
        // backgroundColor: '#1C2536',
        // justifyContent: 'center', 
        // flexDirection: 'column'
      }}
      draggable
    >
      <span>{label}</span>
    </div>
  );
};
