/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (properties, values) => {
    return Array.isArray(values) && values.map((value)=>{
        const newValue = {...value};
        for(let propertie of properties) {
            delete newValue[propertie]
        }
        return newValue;
    })
};
exports.excludeByProperty = (propertie, values) => {
    return Array.isArray(values) && values.filter((item)=>{
        return !item.hasOwnProperty(propertie);
    })
};
exports.sumDeep = (values) => {
    return Array.isArray(values) && values.reduce((result, item)=> {
        const value = {
            objects: item.objects.reduce((result, item)=> {
                result += item.val;
                return result;
            }, 0)
        }
        result.push(value);
        return result;
    }, [])
};
exports.applyStatusColor = (obj, values) => {
    const map = {};
    Object.keys(obj).forEach(key => {
        obj[key].forEach(val=>{
            map[val] = key;
        })
    });
    return Array.isArray(values) && values.reduce((result, item)=>{
        if(map[item.status]) {
            result.push({ ...item, color: map[item.status]});
        }
        return result;
    }, [])
};
exports.createGreeting = (greet, greeting) => {
    return (name) => {
        return greet(greeting, name);
    }
};
exports.setDefaults = (defaultVal) => {
    const keys = Object.keys(defaultVal || []);
    return (obj) => {
       for(let item of keys) {
           if(!obj.hasOwnProperty(item)) {
              obj[item] = defaultVal[item];
           }
       }
       return obj;
    }
};
exports.fetchUserByNameAndUsersCompany = (name, services) => {
    async function getResult() {
        try {
            const statusPromise = services.fetchStatus();
            const users = await services.fetchUsers();
            const user = users.find((item) => {
                return item.name === name;
            });
            const companyPromise = services.fetchCompanyById(user.companyId);
            const [status, company] = await Promise.all([statusPromise, companyPromise]);
            return {
                company,
                status,
                user,
              }
        } catch(e) {
            return e;
        }
    }
    return getResult();
};
