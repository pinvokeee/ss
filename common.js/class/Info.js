class Info
{
    constructor(prop)
    {
        this.ID = 0;
        this.name = "";
        this.items = [];
        
        if (prop != null)
        {
            for (const key of Object.keys(prop))
            {
                this[key] = prop[key];
            }
        }
    }
}