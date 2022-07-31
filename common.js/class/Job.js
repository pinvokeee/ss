class Job
{
    constructor(prop) 
    {
        this.ID = -1;
        this.name = "JOB";
        this.subJobs = [];
        
        if (prop != null)
        {
            for (const key of Object.keys(prop))
            {
                this[key] = prop[key];
            }
        }
    }

    a()
    {
        
    }
}