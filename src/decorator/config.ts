import { ReflectMetadataType } from "../types";
import { isObject, getMetadata, setMetadata } from "../util";
import { CLASS_CONFIG_PROPERTY, CLASS_CONFIG_ARGS } from '../constant';
import { CannotInjectValueError } from "../errors";

export function Config(id?: string) {
    return (target: any, propertyKey: string | symbol, index?: number) => {
        if (isObject(target)) {
            target = target.constructor;
        }

        const key: any = id || propertyKey;
        if (!key) {
            throw new CannotInjectValueError(target, propertyKey ?? index);
        }

        if (index !== undefined) {
            const metadata = (getMetadata(CLASS_CONFIG_ARGS, target) || []) as ReflectMetadataType[];
            metadata.push({ id: key, index });
            setMetadata(CLASS_CONFIG_ARGS, metadata, target);
            return;
        }

        const metadata = (getMetadata(CLASS_CONFIG_PROPERTY, target) || []) as ReflectMetadataType[];
        metadata.push({ id: key, propertyName: propertyKey, });
        setMetadata(CLASS_CONFIG_PROPERTY, metadata, target);
    };
}