class EditingData
{
    constructor()
    {
        this.local = 
        {
            title: "",
            job: null,
            subJob: null,
            freeInput: "",
            reason: "",
            checkedItems: [],
        }
    }

    get title()
    {
        return this.local.title;
    }

    set title(value)
    {
        this.local.title = value;
    }

    set job(value)
    {
        this.local.job = value;
        this.subJob = null;
    }
    
    get job()
    {
        return this.local.job;
    }

    get subJob()
    {
        return this.local.subJob;
    }

    get freeInput()
    {
        return this.local.freeInput;
    }

    set freeInput(value)
    {
        this.local.freeInput = value;
    }

    get reason()
    {
        return this.local.reason;
    }

    set reason(value)
    {
        this.local.reason = value;
    }

    set subJob(value)
    {
        this.local.subJob = value;

        this.checkedItems = value?.infoList.map(info => 
        {
            return {
                name: info.name,
                checked: false,

                items: info.items.map(i => 
                {
                    return {
                        name: i.name,
                        prefix: i.prefix,
                        suffix: i.suffix,
                        value: null,
                    };
                }),
            }
        });

        console.log(value?.infoList);
        console.log(this.checkedItems );
    }

    get checkedItems()
    {
        return this.local.checkedItems;
    }

    set checkedItems(value)
    {
        this.local.checkedItems = value;
    }

    getCheckedItemListText()
    {
        if (this.local.checkedItems == null) return [];

        const arr = [];

        for (const item of this.local.checkedItems)
        {
            if (item.checked)
            {
                arr.push(`${item.name}`);

                for (const c of item.items)
                {
                    if (c.value != null &&  c.value.length > 0)
                    {
                        arr.push(`${c.name}:${c.prefix}${c.value}${c.suffix}`);
                    }
                }
            }
        }

        return arr;
        // console.log(this.local.checkedItems);
    }

    get sh()
    {
        return this.checkedItems?.map(item => {
            if (!item.checked) return "";
            return `${item.name}:\n${item.items.map(child => `${child.name}:${child.prefix}${child.value}${child.suffix}`).join(",")}`
        }).join("");
    }

    get outputText()
    {
        const text = 
        `タイトル:${this.title}\nメイン:${this.job?.name}\nサブ:${this.subJob?.name}\n${this.sh}`;

        return text;
    }

    output()
    {

    }

    get(name)
    {
        return this.local[name];
    }
}