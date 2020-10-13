using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using System;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;
using AutoMapper;

namespace Application.Activities
{
    public class List
    {
        public class Query :IRequest<List<ActivityDto>>{}
        public class Handler :IRequestHandler<Query, List<ActivityDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler (DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<List<ActivityDto>> Handle(Query request, CancellationToken cancellation)
            {
                var activities = await _context.Activities.ToListAsync();
                return _mapper.Map<List<Activity>,List<ActivityDto>>(activities);
            }
        }
    }
}