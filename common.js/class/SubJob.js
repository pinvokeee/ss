class SubJob
{
    constructor(prop)
    {
        this.name = "SUBJOB";
        this.infoList = [];
        this.tips = "";

        if (prop != null)
        {
            for (const key of Object.keys(prop))
            {
                this[key] = prop[key];
            }
        }
    }
}