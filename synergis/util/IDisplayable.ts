/**
 * definition for types that can be toggled in the "map details" tab
 * 
 * @author h.fleischer
 * @since 18.10.2019
 */
export interface IDisplayable {

    isVisible(): boolean;

    toggleVisibility(): boolean;

}