class JobManager
{
    constructor()
    {
        this.title = "";
        this.jobs = [];
        
        this.loader = 
        {
            mainJob(mainJobs)
            {
                return mainJobs.map((job, index) =>
                {
                    return new Job(
                    {
                        ID: index,
                        name: job.name,
                        subJobs: this.subJob(job.subJobs)
                    });
                });
            },
        
            subJob(subJobs)
            {
                return subJobs.map((job, index) =>
                {
                    return new SubJob(
                    {
                        ID: index,
                        name: job.name,
                        tips: job.tips,
                        infoList: this.info(job.info)
                    });                       
                });
            },

            info(infos)
            {
                return infos.map((inf, index) =>
                {
                    return new Info(
                    {
                        ID: index,
                        name: inf.name,
                        items: this.inputItem(inf.items)
                    });                       
                });
            },

            inputItem(items)
            {
                return items.map((item, index) =>
                {
                    return new InputItem(
                    {
                        ID: index,
                        name: item.name,
                        prefix: item.prefix,
                        suffix: item.suffix,
                    });                       
                });
            }
        }
    }

    load(source)
    {
        this.title = source.title;
        this.jobs = this.loader.mainJob(source.jobs);
    }
}