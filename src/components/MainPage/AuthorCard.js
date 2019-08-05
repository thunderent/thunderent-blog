import React from "react";

const styles = {
    authorDescription: {
        width:"42em",
        margin: "0 auto",
        overflow:"auto"
    },
    authorImage : {
        marginTop: "30px",
        marginLeft: "30px",
        marginRight : "30px",
        borderRadius:"50%",
        height:"100px",
        width:"100px",
        float:"left"
    },
    authorName : {
        margin: "25px 40px"       
    }
}
const AuthorCard = () => {
    return(
    <div style={styles.authorDescription}>
        <img style={styles.authorImage} src="https://picsum.photos/id/144/200/200"></img>
        <h3 style={styles.authorName}>Josh Morrison</h3>
        <p><small>Gravity in the space station. There are some clever ideas out there with the space stations of the future</small></p>
    </div>
    )
}

export default AuthorCard;