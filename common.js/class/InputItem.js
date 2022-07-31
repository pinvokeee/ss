class InputItem
{
    constructor(prop)
    {
        this.prefix = "";
        this.suffix = "";
        this.name = "";

        if (prop != null)
        {
            for (const key of Object.keys(prop))
            {
                this[key] = prop[key];
            }
        }
    }
}