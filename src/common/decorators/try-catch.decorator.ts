import { DbErrorsHandler }  from "../errors/db-errors";
import { HttpException }    from "@nestjs/common";


export function TryCatch(){
  return function(constructor: Function) {
    const dbErrorHandler = DbErrorsHandler.getInstance();
    const originalMethods = Object.getOwnPropertyNames(constructor.prototype)
      .filter(method => method !== 'constructor')
      .map(method => ({
        name: method,
        descriptor: Object.getOwnPropertyDescriptor(constructor.prototype, method)
      }));
    
    for (const {name, descriptor} of originalMethods) {
      if( descriptor && typeof descriptor.value === 'function') {
        const originalMethod = descriptor.value;
        const metadataKeys = Reflect.getMetadataKeys(originalMethod);
        const metadata = metadataKeys
          .map(key => ({
              key,
              value: Reflect.getMetadata(key, originalMethod)
            }
          )
        );
        descriptor.value = async function(...args: any[]){
          // const className = constructor.name; This is more for debugging purposes

          try {
            const result = await originalMethod.apply(this, args);
            return result;
          } catch (error) {
            console.log('Error:', error);
            
            const handledError = dbErrorHandler.handleDatabaseError(error);
            throw handledError instanceof HttpException ? handledError : new HttpException(error.message || 'Internal server error', error.status || 500);
          }          
        };
        metadata.forEach(({key, value}) => {
          Reflect.defineMetadata(key, value, descriptor.value);
        });
        Object.defineProperty(constructor.prototype, name, descriptor);
      }
      
    }
  }
}