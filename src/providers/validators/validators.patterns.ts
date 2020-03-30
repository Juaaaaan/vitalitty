export const PATTERNS = {
    NAME: /^[a-zA-Z ]+$/,
    PATTERN_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*_,;:.#/|()'"¬·¡¿=?&])[A-Za-z\d@$!%*_,#;:./()'"¬·¡¿=|?&]{8,}$/,
    // PATTERN_DNI: /^([XYZxyz]|[0-9]){5,7}[0-9]([a-z]|[A-Z]|[0-9])$/i,
    PATTERN_DNI: /^([XYZxyz]{1}[0-9]{7}([a-z]|[A-Z]{1}))|(([0-9]{7,8})([a-z]|[A-Z]{1}))$/i,
    PATTERN_NIE: /^[XYZxyz][0-9]{7}[A-Za-z]$/i,
    PATTERN_EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    PATTERN_CIF: /^([ABCDEFGHJKLMNPQRSUVWabcdefghjklmnpqrsuvw])(\d{7})([0-9A-Ja-j])$/,
    PATTERN_PHONE: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
    PATTERN_POSTAL_CODE: /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/,
    PATTTERN_CREATE_FOLDER: /^[a-zA-Z0-9_ áéíóú]*$/,
    PATTERN_CHAR: /[áàéèíìóòúùñ]/ig,
    PATTERN_DATE: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i,
    NUMBERS_ONLY: /^[0-9]*$/,
    BUSINESS_NAME: /^[a-zA-Z0-9]*$/,
    PATTERN_TEXT: /^[^0-9()[\]{}*&^%$#@|?¿¡!+_<>]+$/,
    PATTERN_TEXT_AND_NUMBERS: /[^()[\]{}*&^%$#@|?¿¡!+_<>-]+$/
};
