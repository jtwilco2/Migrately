CREATE proc [dbo].[Users_SearchStatus]
								@PageIndex int
								,@PageSize int
								,@Query nvarchar(250)


as


/*


	Select *
	From dbo.Users

	Declare @PageIndex int = 0
			,@PageSize int = 100
			,@Query nvarchar(250) = '2'

	Execute dbo.Users_SearchStatus
							@PageIndex
							,@PageSize
							,@Query


*/


BEGIN


		Declare @offset int = @PageIndex * @PageSize

		SELECT u.[Id] as UserId
			,[FirstName]
			,[Mi]
			,[LastName]			
			,[AvatarUrl]
			,[Email]
			,st.Id
			,st.[Name] as Status
			,Role = (
						Select	r.Id
								,r.Name
						From dbo.Roles as r inner join dbo.UserRoles as ur
								on r.Id = ur.RoleId
						Where u.Id = ur.UserId
						For JSON AUTO
			)
			,TotalCount = COUNT(1) OVER()
		FROM [dbo].[Users] as u inner join dbo.StatusTypes as st
							on u.StatusId = st.Id

		WHERE	(st.Id = @Query)

		ORDER BY u.Id

		OFFSET @offSet Rows
		Fetch Next @PageSize Rows ONLY


END
GO
