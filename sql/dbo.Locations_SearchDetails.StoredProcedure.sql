CREATE proc [dbo].[Locations_SearchDetails]
			@Query nvarchar(128)
			,@PageIndex int 
			,@PageSize int
			,@CreatedBy int 
/*
Declare @Query nvarchar(128) = 'Home'
		,@PageIndex int = 0
		,@PageSize int =3
		,@CreatedBy int = 8
Execute dbo.Locations_SearchDetails
								@Query
								,@PageIndex
								,@PageSize
								,@CreatedBy
								
*/

AS

BEGIN

	Declare @offset int = @PageIndex * @PageSize

	SELECT l.[Id]
		  ,lt.[Id]
		  ,lt.[Name]
		  ,[LineOne]
		  ,[LineTwo]
		  ,[City]
		  ,[Zip]
		  ,l.StateId
		  ,s.Name
		  ,[Latitude]
		  ,[Longitude]
		  ,l.[DateCreated]
		  ,l.[DateModified]
		  ,l.[CreatedBy]
		  ,[ModifiedBy]
		  ,TotalCount = COUNT (1) OVER()
	  FROM [dbo].[Locations] as l inner join dbo.Users as u
			on l.CreatedBy = u.Id
			inner join dbo.LocationTypes as lt 
			on l.LocationTypeId = lt.Id
			inner join dbo.States as s
				on l.StateId = s.Id
	WHERE (lt.Name LIKE '%' + @Query + '%')
			AND
			CreatedBy = @CreatedBy
	
	ORDER BY l.Id

		OFFSET @offSet Rows
		Fetch Next @PageSize Rows ONLY

END
GO
