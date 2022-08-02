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
                    console.log(job.tips);
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

    generateJSONString()
    {
        const output_data = { title: "JOBデータ", jobs: [] };

        output_data.title = this.title;

        for (const j of this.jobs)
        {
            const job = { name: j.name, subJobs: [] };
            
            for (const sj of j.subJobs)
            {
                const subjob = { name: sj.name, tips: sj.tips, info: [] };

                for (const inf of sj.infoList)
                {
                    const info = { name: inf.name, items: [] };

                    for (const it of inf.items)
                    {
                        const item = { name: it.name, suffix: it.suffix, prefix: it.prefix };
                        info.items.push(item);
                    }

                    subjob.info.push(info);
                }   
                
                job.subJobs.push(subjob);
            }

            output_data.jobs.push(job);
        }

        return JSON.stringify(output_data);
    }
}