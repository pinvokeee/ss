const infoInputForm = 
{
    props:
    {
        jobManager: 
        {
            type: Object
        }
    },

    updated()
    {
        console.log("v");
    },

    data()
    {
        return {
            
        }
    },

    methods:
    {
        isEnabled(name)
        {
            return !(this.jobManager.selected.checkedItems.find(a => a.name == name) != null);
        }
    },

    computed:
    {
        infoList:
        {
            get()
            {
                if (this.jobManager.selected.subJob == null) return [];
                return this.jobManager.selected.subJob.infoList;
            }
        },
    
    },

    template: `

        <div class="container-fluid p-0 m-0 overflow-auto">
            <div class="row w-100" v-for="info in infoList" :key="info.name">
                    <div class="row">
                        <label class="">
                            <input type="checkbox" class="form-check-input p-0" :value="info" v-model="jobManager.selected.checkedItems">
                            {{info.name}}
                        </label>

                        <div class="ms-2 mt-1 mb-1" v-for="item in info.items" >
                            <div class="container-fluid">
                                <div class="row d-flex">  
                                    <label class="col-form-label col-2" :disabled="isEnabled(info.name)">{{item.name}}</label>
                                    <label class="col-form-label col-1" :disabled="isEnabled(info.name)">{{item.prefix}}</label>
                                    <input class="form-control col" :disabled="isEnabled(info.name)">
                                    <label class="col-form-label col-1" :disabled="isEnabled(info.name)">{{item.suffix}}</label>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>

    `
}