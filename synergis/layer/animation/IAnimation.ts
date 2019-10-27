/**
 * definition for types that drive an animation<br>
 * 
 * @author h.fleischer
 * @since 18.10.2019
 */
export interface IAnimation {

    /**
     * get the fraction (a value between 0 and 1) of this animation (0 = not started, 1 = complete)
     * @param time
     */
    getFraction(): number;

}