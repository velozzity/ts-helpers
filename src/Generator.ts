import ILooseObject from "./interfaces/ILooseObject";
import Files from "./Files";
import Ejs from "ejs";
import crypto from "crypto";

export const generateCode = (templatePath: string, data: ILooseObject): string => {
    const templateString: string = Files.getFileContents(templatePath);
    return Ejs.render(templateString, data);
};

export const generateFile = (templatePath: string, data: ILooseObject, filePath: string): string | undefined => {
    const fileContents: string = generateCode(templatePath, data);
    if (Files.makeFile(filePath, "", fileContents)) return filePath;
};

export const generateResetToken = (uniqueId: string, secret: string): string => {
    return crypto.createHmac('sha256', secret).update(uniqueId).digest('hex');
}

export default {generateCode, generateFile, generateResetToken};