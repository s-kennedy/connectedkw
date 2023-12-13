const Tag = ({ tag }) => {
  return (
    <div className="text-sm px-2 py-1 m-1 ml-0 border-2 border-black rounded-md flex flex-nowrap">
      <span className="whitespace-nowrap">{tag.name}</span>
    </div>
  )
}

export default Tag;