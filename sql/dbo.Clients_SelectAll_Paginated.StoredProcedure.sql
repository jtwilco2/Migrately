CREATE proc [dbo].[Clients_SelectAll_Paginated]
				@PageIndex int
				,@PageSize int

AS

/*----- TEST CODE -----

	DECLARE @PageIndex int = '0'
			,@PageSize int = '10'

	EXECUTE dbo.Clients_SelectAll_Paginated @PageIndex
											,@PageSize

*/

BEGIN
	
	DECLARE @offSet int = @PageIndex * @PageSize

	SELECT c.Id
		   ,c.Email
		   ,c.FirstName
		   ,c.LastName
		   ,c.Mi
		   ,gt.Id
		   ,gt.Name
		   ,c.Landline
		   ,c.Mobile
		   ,l.Id
		   ,lt.Id
		   ,lt.[Name]
		   ,l.LineOne
		   ,l.LineTwo
		   ,l.City
		   ,l.Zip
		   ,l.StateId
		   ,s.Name
		   ,l.Latitude
		   ,l.Longitude
		   ,l.DateCreated
		   ,l.DateModified
		   ,l.CreatedBy
		   ,l.ModifiedBy
		   ,c.IsActive
		   ,c.DateCreated
		   ,c.DateModified
		   ,c.CreatedBy
		   ,c.ModifiedBy
		   ,TotalCount = COUNT(1) OVER()
	FROM dbo.Clients as c inner join dbo.GenderTypes as gt
				on c.GenderTypeId = gt.Id
			inner join dbo.Locations as l
				on c.LocationId = l.Id
			inner join dbo.States as s
				on l.StateId = s.Id
			inner join dbo.LocationTypes as lt 
				on l.LocationTypeId = lt.Id
	WHERE c.IsActive = 1
	
	ORDER BY c.Id

	OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY
	
END
GO
