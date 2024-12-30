

const CardImage = ({img}) => {
    
  return (
    <div>
    <img className="h-auto max-w-full rounded-lg" src={img.url} alt=""/>
</div>
  )
}

export default CardImage