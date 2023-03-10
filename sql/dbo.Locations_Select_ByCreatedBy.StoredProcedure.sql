CREATE proc [dbo].[Locations_Select_ByCreatedBy]
			@CreatedBy int 
			,@PageIndex int 
			,@PageSize int

/*
Declare @CreatedBy int = 1
		,@PageIndex int = 0
		,@PageSize int =3

Execute dbo.Locations_Select_ByCreatedBy
								@CreatedBy
								,@PageIndex
								,@PageSize
								
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
	WHERE CreatedBy = @CreatedBy
	
	ORDER BY l.Id

		OFFSET @offSet Rows
		Fetch Next @PageSize Rows ONLY

		


END 



GO
