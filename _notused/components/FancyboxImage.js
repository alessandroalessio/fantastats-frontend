import { Fancybox } from "@fancyapps/ui"
import '@fancyapps/ui/dist/fancybox.css'

Fancybox.bind("[data-fancybox]");

function FancyboxImage(props){
    let zoomImage = ( props.zoomImage!="" ) ? 'https://img.spacergif.org/v1/spacer.gif' : props.zoomImage
    let thumbImage = ( props.thumbImage!="" ) ? 'https://img.spacergif.org/v1/spacer.gif' : props.thumbImage
    return(
        <>
            <a data-fancybox href={ props.zoomImage }><img src={props.thumbImage} /></a>
        </>
    )
}

export default FancyboxImage();