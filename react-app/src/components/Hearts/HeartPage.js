import Heart from "./Heart"


const HeartPage = ({hearts}) => {


    return (
        <div>
            {hearts &&
                hearts.map(heart => {
                    <Heart heart = {heart}/>
                })
            }
        </div>
    )
}
