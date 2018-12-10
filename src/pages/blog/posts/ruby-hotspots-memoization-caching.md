---
layout: post
title: "Ruby Hotspots: Finding avenues for Memoization and Caching"
desc: > 
  The egineering team at clarisights describe how they found and eliminated hotspots in their
  Ruby on Rails code using caching and memoization. A Key challenge faced was the identification 
  of the hotspots in code where the benefits for caching would be maximized.
author:
  name: "Ashu Pachauri"
published: true
date: 2018-12-05
categories: ["backend", "software-architecture", "scaling", "ruby"]
---

Like most fast growing startups building the next generation technical platform, we, at Clarisights engineering, are always trying to balance the speed with which we push out new features and finding ways for the performance of the system to keep pace with this speed.

There are standard established techniques for scaling any distributed system like _horizontal scaling, query optimization, caching_ etc. A _shared distributed cache_ forms an integral part of any scalable distributed system and can provide huge benefits in both latency and throughput by acting as a very fast middleman between the application and the database.

However, one of the challenges for caching is to identify the hotspots in code where the benefits for caching would be maximized. Also, sometimes, even the fastest shared cache is not enough for getting desired performance primarily due to fact that the code path being cached is so hot that even the fastest cache becomes a bottleneck. That’s where memoization comes in, where you memoize the information in the application itself and trade off some more memory for performance.

This article outlines some of the experiments we did for identifying the hotspots in our code and how we mixed memoization with distributed caching to achieve the desired performance.

## Identifying Hotspots

### 1. Action level metrics

We collect latency metrics for logical units in code like controller actions and use them to identify the primary code paths that we need to target for optimization. We use [<u>ActiveSupport’s custom events</u>](http://guides.rubyonrails.org/active_support_instrumentation.html#creating-custom-events) for performing the action level instrumentation.

Although, this approach tells us that there might be inefficiencies in specific code paths, it does not give us enough granularity to identify specific parts of code that can be cached or memoized for better performance.

### 2. Stack dumps

There are no alternatives to stack dumps while doing spot analysis for inefficiencies in code. This method runs hand-in-hand with the above method where we have already found a larger logical unit of code which is slow and want to find out the avenues of optimization along that code path. Ruby provides a handy way of trapping interrupts and doing specific actions upon trapping the interrupts. We pass the interrupt using a specific kill signal to the process and performing a stack dump on trapping the kill signal. It’s not too diffiicult to do it ourselves, but [<u>Sigdump</u>](https://github.com/frsyuki/sigdump) is a nifty little gem that abstracts it out for us. After doing the recommended setup it’s pretty easy to dump a bunch of stack traces and find the top hotspots by counting code occurrences across those stacktraces:

```bash
#!/bin/bash
# Collect 100 stackdumps 1 second apart
for i in $(seq 1 100); do kill -CONT &lt;pid&gt;; sleep 1; done

# Print the top 20 most frequent lines of code
cat sigdump-&lt;pid&gt;.log| sort | uniq -c | sort -n -k 1 -r | head -20

# Or print only lines from your app, not from included gems
cat sigdump-&lt;pid&gt;.log| grep -v gem | sort | uniq -c | sort -n -k 1 -r | head -20
```

### 3. Test Coverage Numbers

Well written tests and comprehensive test coverage form the foundation of any reliable system. But, well written tests can give other important insights too that can be used to performance optimizations. We use SimpleCov for generating test coverage numbers for our Rails app. A sample SimpleCov report looks like this:

<center>
<img src="https://cdn-images-1.medium.com/max/1600/1*GDgohMBCHF1ZU-H0PAGaCg.png" alt="Extract from SimpleCov report" title="Extract from SimpleCov report" />
</center>
<center><i>Extract from SimpleCov report</i></center><br><br>

Looking at the files sorted by _Avg. Hits/Line_ and diving into that source file for the coverage numbers reveals the hottest code paths in that file. An example is:

<center>
<img src="https://cdn-images-1.medium.com/max/1600/1*cG7jLF14NWqENKJbO5GrJQ.png" alt="SimpleCov coverage extract for a single file" title="SimpleCov coverage extract for a single file" />
</center>
<center><i>SimpleCov coverage extract for a single file</i></center><br><br>

Now, we can target these hotspots for further optimizations like reducing complexity, caching and/or memoization.

An option for gathering coverage numbers in production is [<u>Coverband</u>](https://github.com/danmayer/coverband). It also gives the same output as SimpleCov but in production instead of tests.

## To Cache or to Memoize

There is no golden rule for _memoization vs caching_ choice but caching is generally the preferred choice, especially in a distributed system as the same cache can be used across multiple machines and over a larger time duration.

One of our prominent use cases is running periodic _rake_ tasks in a [<u>Kubernetes cluster</u>](https://kubernetes.io/). The same set of data can be read by multiple rake tasks running in parallel or by the same rake task over multiple runs. That’s why we decided to go with the shared cache on a [<u>Redis</u>](https://redis.io/) cluster.

### Caching is not enough

After caching the computations and queries being done in hotspots, we decided to profile our app and rake tasks again, and much to our surprise the reads from redis cache still showed up as top hotspots in multiple occassions.

That’s when we realized that we would have to go with a combination of caching and memoization, sacrificing some more memory for performance. This enables us to eliminate hotspots in cases where same computation or query is being done in the same process more than once, while the shared redis cache still enables the newer runs to perform those queries faster for the first time.

## The benefits

By using this hybrid caching approach, we were able to eliminate hotspots at some crucial points in our code and were able to **_reduce having to do network calls to database and to shared cache down by upto 99%_** in worst case. We were able to optimize the real time path of our Rails app and **_cut down the worst case query times by more than 50%_**. Our rake tasks are the ones that benefit mostly from this hybrid caching approach where we were able to **_reduce the runtimes of some of the worst offenders by upto 60%_**.

## Lessons learned

Finding hotspots in code requires mixing multiple approaches but it’s worth the effort and can provide huge benefits. Caching is a great resource for improving performance characteristics but there are often cases where it’s just not sufficient and needs to be supplemented by memoization.

-------

Originally posted by [Ashu Pachauri](https://www.linkedin.com/in/ashu210890/) on the [Clarisights engineering Blog](https://clarisights.com/blog/ruby-hotspots-memoization-caching). Re-published with permission.

PS: If you want your Mondays to be awesome, want to be in a state where you look forward to coming to office each day, and want to solve exciting problems like above then [<u>apply here</u>](https://angel.co/clarisights/jobs) to join our team!
