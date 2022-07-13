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
            checkedItems: [],
        }
    },

    methods:
    {
        isEnabled(name)
        {
            return !(this.checkedItems.includes(name));
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

        <div class="container-fluid p-0 m-0">
            <div class="row" v-for="info in infoList" :key="info.name">
                <div class="mb-3">
                    <div class="row">
                        <label>
                            <input type="checkbox" class="form-check-input" :value="info" v-model="checkedItems">
                            {{info.name}}
                        </label>

                        <div class="ms-2 mt-1 mb-1" v-for="item in info.items" >
                            <div class="d-grid gap-2 d-md-flex">  
                                <label class="col-form-label w-25" :disabled="isEnabled(info.name)">{{item.name}}</label>
                                <label class="col-form-label" :disabled="isEnabled(info.name)">{{item.prefix}}</label>
                                <input class=" form-control" :disabled="isEnabled(info.name)">
                                <label class="col-form-label" :disabled="isEnabled(info.name)">{{item.suffix}}</label>
                            </div>
                        </div>

                    </div>                    
                </div>
            </div>
        </div>

    `
}