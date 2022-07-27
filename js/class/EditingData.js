class EditingData
{
    constructor()
    {
        this.local = 
        {
            title: "",
            job: null,
            subJob: null,
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